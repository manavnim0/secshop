#bakefile/function
variable "REPO" {
    default  = "secshop"
}
variable "default_version"{
    version: "latest"
}

function "tags" {
    params =  [ name ]
    result = "$REPO/${name}:${default_version}"
}