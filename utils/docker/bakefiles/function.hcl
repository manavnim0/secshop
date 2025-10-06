#bakefile/function
variable "repo" {
    default  = "secshop"
}
variable "default_version"{
    default = "latest"
}

function "tags" {
    params =  [name]
    result =  ["${repo}/${name}:${default_version}"]
}