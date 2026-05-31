module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = "nextjs-cluster"
  cluster_version = "1.31"

  vpc_id     = aws_vpc.main.id
  subnet_ids = aws_subnet.private_app[*].id

  cluster_endpoint_public_access = true

  enable_cluster_creator_admin_permissions = true  # ADD THIS

  authentication_mode = "API_AND_CONFIG_MAP"        # ADD THIS

  eks_managed_node_groups = {
    main = {
      instance_types = ["t3.small"]
      min_size       = 2
      max_size       = 4
      desired_size   = 2
      version        = "1.31"

      metadata_options = {
        http_tokens                 = "required"
        http_put_response_hop_limit = 1
        http_endpoint               = "enabled"
      }
    }
  }

  tags = { Name = "nextjs-cluster" }
}

output "cluster_endpoint" {
  description = "EKS cluster API endpoint"
  value       = module.eks.cluster_endpoint
}

output "oidc_provider_arn" {
  description = "OIDC provider ARN — needed for IRSA roles"
  value       = module.eks.oidc_provider_arn
}