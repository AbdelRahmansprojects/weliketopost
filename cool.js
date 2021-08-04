dudu is stupid

app.use(express.static(path.join(__dirname, 'public')))

if (process.env.NODE_ENV === 'production') {
    
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(process.cwd(), 'cool.js'))
    })
  }