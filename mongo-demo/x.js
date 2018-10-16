//Using References (Normalization)  -> CONSISTENCY
let author = {
    name: 'Ashok Tulachan'
}

let course = {
    author: 'id'
}


// Using Embedded Documents (Denormalization) -> PERFORMANCE
let course = {
    author: {
        name: 'Ashok Tulachan'
    }
}


// USING HYBRID APPROACH
let author = {
    name: 'Ashok'
    //50 other properties
}

let course = {
    author: {
        id: 'ref',
        name: 'Ashok'
    }
}