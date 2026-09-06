# Evidence Approval Queue

最后更新：2026-09-04

此队列帮助业务侧逐项批准 C2/C3，不代表任何 claim 已成立。只有 Evidence Available 与 Public Approval 均为 Yes，且措辞、主体、范围与有效期核对完成后，才能进入公开内容。

| Priority | Claim | Potential Public Wording | Evidence Required | Evidence Available? | Public Approval? | Pages Affected | Owner Input Needed |
|---|---|---|---|---|---|---|---|
| P0 | Legal / public company identity | Pending exact approved wording | legal record；approved English public name；brand/entity relationship | Unknown | No | About, footer, Organization schema, Contact | 提供文件与允许公开的英文主体 |
| P0 | Manufacturing entity and site identity | Pending exact approved wording | entity；site address；activity；relationship to VITHELO；public-use approval | Unknown | No | Manufacturing, Quality, About, Insights | 逐站点提供主体和授权范围 |
| P0 | Each quality certification | Pending exact certificate-specific wording | certificate PDF/image；exact name；subject entity；site；scope；issuer；issue/expiry；verification path；public permission | Unknown | No | Quality, Manufacturing, About, Documents Guide | 每张证书单独审核；不得用 logo 代替 |
| P1 | Manufacturing process evidence | Pending evidence-led process wording | current process record；approved real images；stage labels；site/product applicability | Unknown | No | Manufacturing, dosage pages, Insights | 提供可公开流程与图片授权 |
| P1 | Quality-control evidence | Pending evidence-led control wording | applicable SOP/record extracts；record owner；scope；redaction and public approval | Unknown | No | Quality, Manufacturing, Insights | 提供允许公开的控制点和证据 |
| P1 | R&D / sample-development evidence | Pending evidence-led development wording | approved workflow；sample records/template；roles；scope；public approval | Unknown | No | OEM / ODM, Quality, Sampling Guide | 提供实际流程与可公开材料 |
| P1 | Raw-material / testing evidence | Pending evidence-led wording | document type；provider/lab identity where applicable；method/scope；public approval | Unknown | No | Quality, Manufacturing, Documents Guide | 明确哪些项目真实适用 |
| P2 | Facilities, employees and years | Publish only if verified and useful | dated official record；definition；entity/site coverage；public approval | Unknown | No | About, Manufacturing | 给出定义口径和证明日期 |
| P2 | Capacity by dosage form | Publish only if verified and decision-useful | unit；period；line/site；assumptions；record date；public approval | Unknown | No | Products, Manufacturing | 每种剂型逐项核验 |
| P2 | Clients, markets and coverage | Publish only if verified and non-confidential | definition；date range；source；confidentiality clearance | Unknown | No | Home, About | 明确口径，不提交客户身份 |
| P2 | MOQ, sampling time and lead time | Project-specific unless a public policy is approved | approved commercial policy；scope；exceptions；effective date | Unknown | No | Products, OEM, Contact, Insights | 提供正式政策；无政策继续不发布数字 |

## Certification Review Rule

GMP、HACCP、Halal、ISO、FDA 相关材料逐项核对 exact name、entity、site、scope、issuer、validity、expiry 与 public permission。监管或注册状态不得改写成不存在的 “FDA certified” claim。
