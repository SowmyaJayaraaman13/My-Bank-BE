Project url: https://koxyqiynnkfzyfitprty.supabase.co

API key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtveHlxaXlubmtmenlmaXRwcnR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3ODMzODUsImV4cCI6MjA0MTM1OTM4NX0.X2DXTkdJW1A0_NVyKNlrcEtSOdR2K4IJAKgmSD2JLeY

Supabase Access Token: sbp_a8723e9e2b019270bcfa61158f9aab41daefade1

transaction url: postgresql://postgres.koxyqiynnkfzyfitprty:[YOUR-PASSWORD]@aws-0-ap-south-1.pooler.supabase.com:6543/postgres

postgresql://postgres.koxyqiynnkfzyfitprty:Myfundflowapp@1@aws-0-ap-south-1.pooler.supabase.com:6543/postgres





const response = await supabase
  .from('countries')
  .delete()
  .in('id', [1, 2, 3])


const { data, error } = await supabase
  .from('cities')
  .select('name, countries(*)')
  .eq('countries.name', 'Estonia')





{
    "accountData": [
        {
            "id": 9,
            "created_at": "2024-10-11T09:40:06.529937+00:00",
            "name": "Kandhaguru",
            "settings": {},
            "logo_url": null
        }
    ],
    "userData": [
        {
            "id": 1,
            "created_at": "2024-10-11T09:40:06.691857+00:00",
            "name": "Kandhaguru",
            "email": "kandhaguru@gmail.com",
            "password": "123456789",
            "is_admin": true,
            "profile_url": null,
            "secret": "29c53df3-fa7a-402b-be6a-a8b66bf63fdc"
        }
    ]
}




[
    {
        "id": 9,
        "created_at": "2024-10-11T09:40:06.529937+00:00",
        "name": "Kandhaguru",
        "settings": {},
        "logo_url": null
    }
]



{
    "statusCode": 401,
    "errorMsg": "User is not authenticated!!!!",
    "data": "No auth token"
}



{
    "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJrYW5kaGFndXJ1QGdtYWlsLmNvbSIsImlhdCI6MTcyODYzOTkxNSwiZXhwIjoxNzI4NjQxNzE1fQ.SP7E1PuzklBNTz_ZNg0VyZRSbRUa_nJQh4fYPGAibFg",
    "expirationDate": "11/10/2024 3:45:15 pm",
    "data": {
        "id": 1,
        "created_at": "2024-10-11T09:40:06.691857+00:00",
        "name": "Kandhaguru",
        "email": "kandhaguru@gmail.com",
        "password": "123456789",
        "is_admin": true,
        "profile_url": null,
        "secret": "29c53df3-fa7a-402b-be6a-a8b66bf63fdc"
    }
}


payload----> {
  id: 1,
  email: 'kandhaguru@gmail.com',
  iat: 1728639915,
  exp: 1728641715
}