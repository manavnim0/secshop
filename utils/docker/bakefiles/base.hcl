#bakefile/base

target "base" {
    context = "." 
    dockerfile = "utils/docker/dockerfiles/base.dockerfile"
    tags = tags("base") 
}

target "frontend" {
    inherits = ["base"]
    context = "."
    dockerfile = "utils/docker/dockerfiles/frontend.dockerfile"
    tags =  tags("frontend")
}

target "product" {
    inherits = ["base"] 
    context = "."
    dockerfile = "utils/docker/dockerfiles/product.dockerfile"
    tags =  tags("product")
}
target "auth" {
    inherits = ["base"] 
    context = "."
    dockerfile = "utils/docker/dockerfiles/auth.dockerfile"
    tags =  tags("auth")
}