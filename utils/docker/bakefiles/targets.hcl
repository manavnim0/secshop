#bakefile/targets

group "services" {
    targets = ["base", "frontend", "product","auth","gateway"]
}

group "default" {
    targets = ["services"]
}