from tabulate import tabulate

alunos = [
    {"matrícula": 1001, "nome": "Alice Santos", "idade": 15, "ano": "9º ano"},
    {"matrícula": 1002, "nome": "Bruno Lima", "idade": 14, "ano": "8º ano"},
    {"matrícula": 1003, "nome": "Carla Souza", "idade": 16, "ano": "1º ano do Ensino Médio"},
    {"matrícula": 1004, "nome": "Diego Ferreira", "idade": 17, "ano": "2º ano do Ensino Médio"},
    {"matrícula": 1005, "nome": "Evelyn Gomes", "idade": 18, "ano": "3º ano do Ensino Médio"},
]

def adicionar_alunos():
    matricula = int(input("Digite aqui o número da nova matrícula: "))
    print(f'Ok, o número de matrícula será {matricula}')
    nome = input("digite o nome do aluno: ")
    idade = int(input("Digite aqui a idade do aluno: "))
    ano = input("Digite aqui o ano em que ele está matriculado ex. 3º ano do Ensino Médio: ")
    aluno = {"matrícula": matricula, "nome": nome, "idade": idade, "ano": ano}
    alunos.append(aluno)
    print(f'O aluno {nome} foi cadastrado com sucesso!')
    voltar()


def ver_alunos(retornar_para_main=False):
    cabecalho = alunos[0].keys()
    linhas = [aluno.values() for aluno in alunos]
    print(tabulate(linhas, headers=cabecalho, tablefmt= "grid"))

    if retornar_para_main:
        input("\nPressione Enter para voltar ao menu principal...")
        voltar()
    

def excluir_alunos():
    ver_alunos()
    matricula = int(input("Digite o número de matrícula do aluno que deseja excluir do sistema: "))
    aluno = verificar_matricula(matricula)
    if aluno:
        escolha = input(f'Você tem certeza que gostaria de apagar o aluno {aluno["nome"]} dos registros da escola? (s/n) ')
        if escolha == "s":
            alunos.remove(aluno)
            ver_alunos()
        else:
            print("Operação cancelada!")
    else:
        print("Não foi possível prosseguir, aluno não encontrado.")
        voltar()

        



def verificar_matricula(valor):
    print(f'Ok, vamos verificar se há algum aluno com esse número de matrícula...')
    for aluno in alunos:
        if aluno["matrícula"] == valor:
            print(f'Este número de matrícula está cadastrado em nossa escola, e é referente ao aluno {aluno["nome"]} do {aluno["ano"]}')
            return aluno
    print(f'Não encontramos nenhum registro de número {valor}')
    return None
        

def atualizar_aluno():
    escolha = input("Qual item entre matrícula, nome, idade e ano você gostaria de alterar? ")
    if escolha not in ["matrícula", "nome", "idade", "ano"]:
        print("Opção inválida.")
        atualizar_aluno()
    ver_alunos()
    matricula = int(input("Digite aqui o número de matrícula do aluno que deseja alterar: "))
    aluno = verificar_matricula(matricula)
    if aluno:
        if escolha in ["matrícula", "idade"]:
            novo_valor = int(input(f'Digite aqui o novo valor para {escolha} '))
        else:
            novo_valor = input(f'Digite aqui o novo valor para {escolha} ')
        aluno[escolha] = novo_valor
        print(f'{escolha} agora foi atualizado para {novo_valor}')
        ver_alunos()
        voltar()
    
    else:
        print("Não foi possível atualizar. Matrícula não encontrada.")
        voltar()


def voltar(): #Decidi criar essa função porque assim eu consigo sempre exibir os alunos sem parar o código nem voltar para main sem querer e mantém o user no controle.
    voltar = int(input("Pressione 1 para voltar ao menu ou qualquer tecla para sair: "))
    if voltar == 1:
        main()
    else:
        exit()

def main():
    opcoes =  [
        ["1", "Adicionar aluno"],
        ["2", "Ver alunos"],
        ["3", "Excluir alunos"],
        ["4", "Atualizar alunos"]
    ]

    print(tabulate(opcoes, headers=["ID", "Opção"], tablefmt="fancy_grid"))

    escolha = int(input("Escolha a opção desejada: "))
    if escolha == 1:
        adicionar_alunos()
    elif escolha == 2:
        ver_alunos(retornar_para_main=True)
    elif escolha == 3:
        excluir_alunos()
    elif escolha == 4:
        atualizar_aluno()
    else:
        print("Opção inválida")
        main()


if __name__ == "__main__":
    main()