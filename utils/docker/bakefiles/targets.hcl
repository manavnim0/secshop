#bakefile/targets

group "services" {
    targets = ["base","frontend"]
}

group "default" {
    targets = ["services"]
}