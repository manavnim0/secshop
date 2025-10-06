#bakefile/targets

group "services" {
    targets = ["base"]
}

group "default" {
    targets = ["services"]
}