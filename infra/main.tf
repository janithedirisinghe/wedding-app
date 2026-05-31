terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    tls = {
      source  = "hashicorp/tls"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "nextjs-app-tfstate-je"
    key            = "nextjs/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "nextjs-tfstate-lock"
    encrypt        = true
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "nextjs-test"
      Environment = var.environment
      Owner       = "janith@example.com"
    }
  }
}