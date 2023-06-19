# l2a3-cow-hut-backend-assignment-senseix21

  ### Application Routes:

   #### User
   - api/v1/auth/signup (POST)
   - api/v1/users (GET)
   - api/v1/users/6177a5b87d32123f08d2f5d4 (Single GET) 
   - api/v1/users/6177a5b87d32123f08d2f5d4 (PATCH)
   - api/v1/users/6177a5b87d32123f08d2f5d4 (DELETE)


   #### Cows
   - api/v1/cows (POST)
   - api/v1/cows (GET)
   - api/v1/cows/6177a5b87d32123f08d2f5d4 (Single GET)
   - api/v1/cows/6177a5b87d32123f08d2f5d4 (PATCH)
   - api/v1/cows/6177a5b87d32123f08d2f5d4 (DELETE)

   ### Pagination and Filtering routes of Cows

   - api/v1/cows?pag=1&limit=10
   - api/v1/cows?sortBy=price&sortOrder=asc
   - api/v1/cows?minPrice=20000&maxPrice=70000
   - api/v1/cows?location=Chattogram
   - api/v1/cows?searchTerm=Cha
     
  
   #### Orders
   - api/v1/orders (POST)
   - api/v1/orders (GET)

