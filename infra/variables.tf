variable "aws_region" {
  description = "AWS region to deploy everything into"
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment name — used in tags"
  default     = "prod"
}