  response.cookie("token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true, 
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });