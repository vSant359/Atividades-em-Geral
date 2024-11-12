escola =[]

def add_aluno():
    aluno = {}
    nome = input("Digite aqui o nome do aluno: ")
    matricula = input("Digite aqui o número da matrícula do aluno: ")
    aluno["nome"] = nome
    aluno["matricula"] = matricula
    escola.append(aluno)
    print(f'Parabéns o aluno {nome} foi cadastrado!')
    main()
    

def excluir_aluno():
    matricula = input("Digite aqui a matrícula do aluno a excluir: ")  
    for people in escola:
        if people["matricula"] == matricula:
            print(f'{people["nome"]} será excluído')
            escola.remove(people) 
            main()
        else:
            print(f'Não encontramos nenhum aluno com a matrícula {matricula}')
            main()
            
    
def main():
    print("Olá o que deseja fazer?")
    print("1 para adicionar alunos")
    print("2 para excluir alunos")
    print("3 para ver todos os alunos")
    print("4 para sair")
    escolha = int(input("Escolha a opção desejada: "))
    if escolha == 1:
        add_aluno()
    elif escolha == 2:
        excluir_aluno()
    elif escolha == 3:
        print(escola)
        main()
    elif escolha == 4:
        return

if __name__ == '__main__':
    main()
