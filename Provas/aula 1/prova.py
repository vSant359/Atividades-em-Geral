email = 'email@gmail.com'
password = "12345"
control = True

while control:
    verify_email = input("Digite aqui o email cadastrado: ")
    verify_pass = input("Digite aqui a senha: ")

    if verify_email != email or verify_pass != password:
        print("Usuário ou senha incorretos!!!")
    else:
        print("Seja bem vindo")
        control = False
        