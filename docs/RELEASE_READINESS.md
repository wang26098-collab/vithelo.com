# VITHELO 上线准备状态

## TECHNICAL READY

- Next.js production build、TypeScript、lint、unit tests
- 核心路由、8 个剂型深链、导航与 sitemap
- 语义 HTML、表单标签、公开事实边界
- Email / WhatsApp fallback（无站内存储）
- Public-claim guard：未发现未经授权的认证、设施、员工、市场或产能数字出现在公开页面
- Browser QA baseline：READY；核心路由、404、首页语义顺序与代表性剂型路径已验证

## PARTIAL / POST-LAUNCH

- Products Hub：8-format discovery 已成立，筛选与更深上下文仍可优化
- RFQ：统一 schema 已建立；当前仍由浏览器渠道承接
- Analytics：provider-neutral 事件契约与 no-op adapter 已建立；页面触发、consent 与 provider 仍未接入
- Mobile / desktop：READY baseline；后续仅保留常规回归

## BUSINESS / DEPLOYMENT BLOCKED

- Node 20 clean install：Environment Compatibility Verification Pending（不阻止当前发布）
- Production canonical hostname：正式部署环境尚未最终验证
- 法定主体、地址、认证与产能公开授权：业务事实未确认
- Server-side RFQ provider / CRM / anti-spam service：无授权凭据，不阻止当前 Email / WhatsApp fallback 上线
