#bakefile/targets

group "services" {
    targets = ["base", "frontend", "product"]
}

group "default" {
    targets = ["services"]
}