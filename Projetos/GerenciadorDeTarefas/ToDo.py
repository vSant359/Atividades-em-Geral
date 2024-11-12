from tabulate import tabulate
from colorama import Fore, Style

TarefasEmAndamento = [{"Nome": "Revisão do código", "Descrição": "Revisar código para o sprint atual", "Categoria": "Cama", "Prioridade": "Média"},
 {"Nome": "Organizar documentos", "Descrição": "Arrumar documentos em pastas", "Categoria": "mesa", "Prioridade": "Baixa"},
  {"Nome": "Reunião com cliente", "Descrição": "Discutir sobre o escopo do projeto", "Categoria": "Banho", "Prioridade": "Alta"}]

TarefasConcluidas = []

def add_tarefas():
    nome = verificando_nome()
    descricao = input("Agora dê uma descrição para essa tarefa: ")
    categoria = input("Agora crie uma categoria ou selecione uma das criadas anteriormente: ")
    prioridade = input("Selecione um nível de prioridade entre baixa, média e alta: ")
    if prioridade == "Baixa":
        prioridade_colorida = f"{Fore.GREEN}Baixa{Style.RESET_ALL}"
    elif prioridade == "Média":
        prioridade_colorida = f"{Fore.YELLOW}Média{Style.RESET_ALL}"
    elif prioridade == "Alta":
        prioridade_colorida = f"{Fore.RED}Alta{Style.RESET_ALL}"
    else:
        print("Nível de prioridade inválido. Usando 'baixa' como padrão.")
        prioridade_colorida = f"{Fore.GREEN}Baixa{Style.RESET_ALL}"
    tarefa = {"Nome": nome, "Descrição": descricao, "categoria": categoria, "Prioridade": prioridade_colorida}
    TarefasEmAndamento.append(tarefa)
    ver_todas_tarefas()
    main()        
    

def ordenar_por_prioridade():
    ordem = {"Alta": 1, "Média": 2, "Baixa": 3}
    TarefasEmAndamento.sort(key=lambda tarefa: ordem.get(tarefa.get("Prioridade"),4))


def ver_todas_tarefas():
    ordenar_por_prioridade()
    cabecalhos = TarefasEmAndamento[0].keys()

    linhas = [tarefa.values() for tarefa in TarefasEmAndamento]

    print(tabulate(linhas, headers=cabecalhos, tablefmt="grid"))
    main()


def ver_tarefas_concluidas():
    cabecalhos = TarefasConcluidas[0].keys()

    linhas = [tarefa.values() for tarefa in TarefasConcluidas]

    print(tabulate(linhas, headers=cabecalhos, tablefmt="grid"))
    main()


def concluir_tarefas():
    ver_todas_tarefas()
    escolha = input("Digite aqui o nome da tarefa que você deseja marcar como concluída: ")
    for tarefas in TarefasEmAndamento:
        if escolha == tarefas["Nome"]:
            TarefasConcluidas.append(tarefas)
            TarefasEmAndamento.remove(tarefas)
            print(f'A tarefa {tarefas["Nome"]} foi concluída')
            ordenar_por_prioridade()
            ver_tarefas_concluidas()
            main()
        else:
            print(f'Não encontramos a tarefa {escolha}, por favor verifique e tente novamente')
            concluir_tarefas()
            main()
    

def verificando_nome():
    nome = input("Digite aqui o nome da nova tarefa: ")
    for tarefas in TarefasEmAndamento:
        if nome == tarefas["Nome"]:
            print(f'Já há uma tarefa com este nome, por favor escolha outro')
            verificando_nome()
        else:
            print(f'Ok, sua tarefa se chamará {nome}')
            return(nome)


def main():
    print("Olá seja muito bem vindo! Escolha uma das opções abaixo:")
    
    opcoes =  [
        ["1", "Adicionar uma tarefa"],
        ["2", "Ver todas as tarefas"],
        ["3", "Ver tarefas concluídas"],
        ["4", "Concluir tarefas"]
    ]

    print(tabulate(opcoes, headers=["ID", "Opção"], tablefmt="fancy_grid"))

    escolha = int(input("Escolha a opção desejada: "))
    if escolha == 1:
        add_tarefas()
    elif escolha == 2:
        ver_todas_tarefas()
    elif escolha == 3:
        ver_tarefas_concluidas()
    elif escolha == 4:
        concluir_tarefas()
    else:
        print("Opção inválida")
        main()


if __name__ == "__main__":
    main()