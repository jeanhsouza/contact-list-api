<!DOCTYPE html>
<html>
<body>
  <h1>API Documentation</h1>
  
  <h2>Contacts</h2>
  <p>A collection of endpoints for managing contacts.</p>
  
  <h2>Deploy</h2>
  <p>https://contact-list-api-lepu.onrender.com</p>
  
  <h3>Delete Contact</h3>
  <pre class="code">
    DELETE /contacts/1
  </pre>
  
  <h3>Update Contact</h3>
  <pre class="code">
    PATCH /contacts/1
    Content-Type: application/json
    
    {
      "email": "augustoti2@gmail.com"
    }
  </pre>
  
  <h3>Create Contact</h3>
  <pre class="code">
    POST /contacts
    Content-Type: application/json
    
    {
      "name": "Antonio 5",
      "email": "Jeanzao@gmail.com",
      "fone": "(93) 99975-3994"
    }
  </pre>
  
  <h3>Get All Contact</h3>
  <pre class="code">
    GET /contacts
  </pre>
  
  <h2>Users</h2>
  <p>A collection of endpoints for managing users.</p>
  
  <h3>Delete User</h3>
  <pre class="code">
    DELETE /users/
  </pre>
  
  <h3>Update User</h3>
  <pre class="code">
    PATCH /users
    Content-Type: application/json
    
    {
      "fone": "(71) 99725-8287"
    }
  </pre>
  
  <h3>Retrieve a User</h3>
  <pre class="code">
    GET /users/profile
  </pre>
  
  <h3>Retrieve All Users</h3>
  <pre class="code">
    GET /users?page=1&amp;limit=2
  </pre>
  
  <h3>Create User</h3>
  <pre class="code">
    POST /users
    Content-Type: application/json
    
    {
      "name": "larissa",
      "password": "123456",
      "email": "larissa@mail.com",
      "fone": "(28) 99921-5674"
    }
  </pre>
  
  <h3>Login</h3>
  <pre class="code">
    POST /login
    Content-Type: application/json
    
    {
      "email": "user@example.com",
      "password": "secret"
    }
  </pre>
</body>
</html>
