# Specificity

1. save in the array

    [

        nb of inline-style, 
        
        nb of id-selector (#id), 
        
        nb of class-selector (.cls) / attributes selectors ([type="radio"]) / pseudo-classes (:hover), 
        
        nb of type-selector (h1) / pseudo-elements (::before)
    ]
    
    ```css
    #id div.a#id {
        ...
    } 
    
    [0, 2, 1, 1]
    ```

2. caculate

    S = 0 * N^3 + 2 * N^2 + 1 * N^1 + 1 * N^0


