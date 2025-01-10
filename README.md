# Instructions to run

1) Clone the repository into your local computer
2) Make sure you have docker desktop installed
3) Run docker create volume app-db
4) Navigate to folder in terminal
5) Run docker-compose build
6) Run docker-compose up -d
9) Go to http://localhost:8080/

# What to do after making changes to obstacles 

1) Delete build folder in frontend
2) Run npm run build in frontend directory
3) Change back to original directory
4) Run docker-compose build
5) Run docker-compose up -d
6) Go to http://localhost:8080/
