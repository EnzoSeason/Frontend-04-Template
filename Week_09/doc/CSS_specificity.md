# Specificity

1. save in the array

    [nb of inline-style, nb of id-selector, nb of class-selector, nb of type-selector]``

    ```css
    #id div.a#id {
        ...
    } 
    
    [0, 2, 1, 1]
    ```

2. caculate

    S = 0 * N^3 + 2 * N^2 + 1 * N^1 + 1 * N^0


