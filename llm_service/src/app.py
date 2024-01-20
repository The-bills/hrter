from dotenv import load_dotenv, find_dotenv
_ = load_dotenv(find_dotenv())


from router import app

if __name__ == '__main__':
   app.run(debug = True, port=8001)
