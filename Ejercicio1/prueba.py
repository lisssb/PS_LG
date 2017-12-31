def test2(number_list):
    for number in number_list:
        divisores = [divisor for divisor in range(1, (number // 2) + 1) if (number % divisor == 0) ]
        suma = sum(divisores)

        if suma == number:
            resultado = "perfecto"
        elif suma < number:
            resultado = "defectivo"
        else:
            resultado = "abundante"

        print("{} es un número {}".format(number, resultado))

test2([126, 64, 6,5,8, 4, 7, 9, 21,12, 15, 10,16, 18])
