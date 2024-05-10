# TELEGRAM USERNAME INFO

---

## This project is a Node.js server designed to retrieve information about a Telegram username, including the username's name, bio, and profile photo.

### Usage

To use this server, send a GET request to the endpoint /username/{username} where {username} is the Telegram username you want to retrieve information for.

##### Example:

`GET /username/dasturchi_pf`

##### Respone

The server responds with a JSON object containing the following information:

```json
{
  "name": "🍇 Дастурчининг кундалиги",
  "bio": "Tanqid, life style, kallaga kelgan oltin fikrlar, komputsiy",
  "profilePhotoUrl": "https://cdn4.cdn-telegram.org/file/dz3fgem-9kQBul0gxQwtDS1bgG54uHpow8HX0OQW4eXpCbWR9yIhSwc0qZG1DvynAYNvh_rLFhDFf9hlxBUQHkuI_b1nBVDo8C9GXaODpppjHe0hBPDoRsBwzqKWDJOyz33uZ-9L4JmFvWlIkd6qwT3Amrp0JDur0NDZ0p1bnQ2Z4IbqvroLnOR0XU95uZNd71KXejyuFSAkphGgp1ndBNZPv_kYn22jkWHi6pwRJeGqzFV1z7AkkQdFHfQ2juDE6gXzQT3YE9LAYE-6BmSExcnUvxaxpZjXRLl2Bla7ArQk9ZC7TlzPu5fX60sLOJjSBP7BJ8aQKWXiNmiFgM7vrg.jpg"
}
```

### Installation

To run this server locally, follo these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/mamurovDev/telegram-username-info
```

2. Navigate to the porject directory:

```bash
cd telegram-username-info
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

The server will start listening for requests on port 3000 by default. You can access it at http://localhost:3000.
