# Overview

- Build SecureShop - a fictional e-commerce mircoservice platform with:
1. React+ TyperScript UI 
2. API gateways (Node/TS)
4. Product, Orders, Auth mircoservice (Node/TS)
5. Payment & Crypto-signing service in RUST (security-critical)
6. PostgreSQL (stateful); Redis (cache); MinIO (object store)
7. Deployed to AWS EKS (Terraform), GitOps for CD (ArgoCD)
8. Full DevSecOps pipeline: SAST,SCA, SBOM. IaC scanning, container scanning, secrect management, runtime protection, policy-as-code, observability, incident playbooks


## Hight Level Tech Stack 
1. Languages: TyperScript/Node.js, Rust for crictial service, React (TyperScript) frontend
2. Container: Docker (mutlistage builds)
3. Orchestration: Kubernetes on EKS
4. IaC: Terraform + modular structure
5. CI:GitHub Actions
6. GitOps/CD:  ArgoCD 
7. Secrects: HarshiCorp Vaults (or AWS secrect)
8. SBOM: syft (SBOM), grype( vuln scan)
9. Iac Scan: Checkov or tfsec (use open source)
10. policy-as-code: OPA/Gatekeeper and kyverno
11. Runtime detection: Falco (+eBPF), Prometheus/Grafana for metrics
12. Loggin: EFK (Elasticsearch/Fluentd/Kibana) or Loko+Grafana
13. Server mesh: linkerd (or lstio for advance traffice control)
14. Observability: OpentTelemetry, Jaeger
15. Testing: Jest(unit), Supertest(integration),k6 (load), OWASP ZAP (DAST)
16. Chaos & resilience: LitmusChaos or Chaos mesh
17. CI Secrects: Github Actions secrect + OIDC for workload identuty to AWS (avoid long-lived keys)
