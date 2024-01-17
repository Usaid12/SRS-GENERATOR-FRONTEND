import { http, HttpResponse } from "msw";

export const handlers = [
  http.post("/login", (req, res, ctx) => {
    const { username } = req.body;

    return res(
      ctx.json({
        id: "f79e82e8-c34a-4dc7-a49e-9fadc0979fda",
        username,
        firstName: "John",
        lastName: "Maverick",
      })
    );
  }),
  http.post("http://localhost:5000/api/generate", () => {
    const res = {
      data: {
        id: 1,
        name: "Usaid",
        description: "abc",
        created: "122",
        file_url: "abc.txt",
      },
      message: "Srs generating....",
    };
    // console.log(req)
    return new HttpResponse(JSON.stringify(res), {
      status: 201,
      headers: { "Content-type": "application/json" },
    });

    // Mock API response
  }),
  // console.log(http)
];
