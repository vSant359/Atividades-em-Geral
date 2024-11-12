notas = []

while len(notas) < 5:
    nota = int(input("Digite aqui a nota para calcularmos sua média: "))
    notas.append(nota)



def verificar_situacao():
    media = calcular_media()
    if media >= 7:
        print(f'Sua média é de {media}, você foi aprovado')
    elif media >= 9:
        print(f'Parabéns, sua média é de {media}')
    else:
        print(f'Sua média é de {media}, você foi reprovado')


def calcular_media():
    media = sum(notas) / len(notas)
    return media




verificar_situacao()