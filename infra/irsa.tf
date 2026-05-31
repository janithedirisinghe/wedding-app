locals {
  oidc_provider = replace(
    module.eks.cluster_oidc_issuer_url,
    "https://",
    ""
  )
}

resource "aws_iam_role" "wedding_pod" {
  name = "wedding-pod-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Principal = {
        Federated = module.eks.oidc_provider_arn
      }
      Action = "sts:AssumeRoleWithWebIdentity"
      Condition = {
        StringEquals = {
          "${local.oidc_provider}:sub" = "system:serviceaccount:wedding-prod:wedding-sa"
          "${local.oidc_provider}:aud" = "sts.amazonaws.com"
        }
      }
    }]
  })

  tags = { Name = "wedding-pod-role" }
}

resource "aws_iam_role_policy" "wedding_secrets" {
  name = "wedding-secrets-policy"
  role = aws_iam_role.wedding_pod.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = ["secretsmanager:GetSecretValue"]
        Resource = "arn:aws:iam::140023361098:role/wedding-pod-role"
      }
    ]
  })
}

output "wedding_pod_role_arn" {
  description = "IAM role ARN for wedding app pod"
  value       = aws_iam_role.wedding_pod.arn
}