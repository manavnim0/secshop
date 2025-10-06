#bakefile/base

target "base" {
    context = "utils/docker/dockerfiles/" 
    dockerfile = "base.dockerfile"
    tags = tags("base") 
}

