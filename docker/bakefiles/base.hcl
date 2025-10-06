#bakefile/base

target "base" {
    context = "./dockerfiles/"
    dockerfiles = "base.dockerfile"
    tags = tags('base') 
}

