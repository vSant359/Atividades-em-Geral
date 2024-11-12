lista_impar = []
lista_par = []
lista_geral = []
tupla = (lista_par, lista_impar)

while len(lista_geral) < 10:
    numeros = int(input("Digite 10 números inteiros aleatórios: "))
    lista_geral.append(numeros)

for i in lista_geral:
    if i % 2 == 0:
        lista_par.append(i)
        
    else:
        lista_impar.append(i)
    
print('Os numeros são: ', tupla)

print(f'A soma dos valores pares é de {sum(lista_par)}' )
print(f'A soma dos valores ímpares é de {sum(lista_impar)}')
print(f'A soma de todos os valores é de {sum(lista_geral)}')