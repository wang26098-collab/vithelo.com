param(
  [Parameter(ValueFromRemainingArguments = $true)]
  [string[]]$PlaywrightArgs
)

$ErrorActionPreference = "Stop"
$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$playwrightCli = Join-Path $repoRoot "node_modules/@playwright/test/cli.js"
$server = $null
$serverListenerId = $null
$testExitCode = 1
$mutex = [System.Threading.Mutex]::new($false, "Local\VitheloE2E3100")
$hasMutex = $false

function Get-E2EListenerProcessId {
  foreach ($line in (& netstat.exe -ano -p tcp)) {
    if ($line -match "^\s*TCP\s+\S+:3100\s+\S+\s+LISTENING\s+(\d+)\s*$") {
      return [int]$Matches[1]
    }
  }

  return $null
}

try {
  $hasMutex = $mutex.WaitOne(0)
  if (-not $hasMutex) {
    throw "Another VITHELO E2E run is already active."
  }

  if ($null -ne (Get-E2EListenerProcessId)) {
    throw "Port 3100 is already in use. Stop the existing service before running E2E tests."
  }

  $server = Start-Process `
    -FilePath "node.exe" `
    -ArgumentList @("node_modules/next/dist/bin/next", "dev", "--hostname", "127.0.0.1", "--port", "3100") `
    -WorkingDirectory $repoRoot `
    -WindowStyle Hidden `
    -PassThru

  $deadline = (Get-Date).AddSeconds(120)
  $ready = $false

  while ((Get-Date) -lt $deadline) {
    if ($server.HasExited) {
      throw "Next.js E2E server exited before becoming ready."
    }

    try {
      $response = Invoke-WebRequest -Uri "http://127.0.0.1:3100" -UseBasicParsing -TimeoutSec 2
      if ($response.StatusCode -ge 200 -and $response.StatusCode -lt 500) {
        $ready = $true
        break
      }
    }
    catch {
      Start-Sleep -Milliseconds 250
    }
  }

  if (-not $ready) {
    throw "Timed out waiting for the Next.js E2E server on 127.0.0.1:3100."
  }

  $serverListenerId = Get-E2EListenerProcessId
  $env:E2E_EXTERNAL_SERVER = "1"
  & node.exe $playwrightCli test @PlaywrightArgs
  $testExitCode = $LASTEXITCODE
}
finally {
  Remove-Item Env:E2E_EXTERNAL_SERVER -ErrorAction SilentlyContinue

  if ($null -ne $server -and -not $server.HasExited) {
    Stop-Process -Id $server.Id -Force -ErrorAction SilentlyContinue
  }

  if ($null -ne $serverListenerId -and $serverListenerId -ne $server.Id) {
    Stop-Process -Id $serverListenerId -Force -ErrorAction SilentlyContinue
  }

  if ($hasMutex) {
    $mutex.ReleaseMutex()
  }
  $mutex.Dispose()
}

exit $testExitCode
