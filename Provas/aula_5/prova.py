from functools import reduce

numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

def quadrado(x):
    return x ** 2

result = map(quadrado, numeros)

resultado_lista = list(result)

print(f'Todos os valores da lista ao quadrado são {resultado_lista}')

def e_par(x):
    return x % 2 == 0

result2 = filter(e_par, numeros)

resultado_lista2 = list(result2)

print(f'Todos os valores pares da lista são {resultado_lista2}')



def somar(x, y):
    return x + y

result3 = reduce(somar, numeros)

print(f'A soma dos valores da lista é {result3}')