def calcular_broadcast(ip, mascara):
    ip_split = ip.split(".")
    mascara_split = mascara.split(".")
    broadcast = []
    for i in range(4):
        broadcast.append(str(int(ip_split[i]) | (255 - int(mascara_split[i]))))
    return ".".join(broadcast)

def calcular_wildcard(mascara):
    mascara_split = mascara.split(".")
    wildcard = []
    for i in range(4):
        wildcard.append(str(255 - int(mascara_split[i])))
    return ".".join(wildcard)

def calcular_primeiro_ip(ip, mascara):
    ip_split = ip.split(".")
    mascara_split = mascara.split(".")
    primeiro_ip = []
    for i in range(4):
        primeiro_ip.append(str(int(ip_split[i]) & int(mascara_split[i])))
    return ".".join(primeiro_ip)

def calcular_ultimo_ip(ip, mascara):
    ip_split = ip.split(".")
    mascara_split = mascara.split(".")
    ultimo_ip = []
    for i in range(4):
        ultimo_ip.append(str(int(ip_split[i]) | (255 - int(mascara_split[i]))))
    return ".".join(ultimo_ip)

def calcular_endereco_rede(ip, mascara):
    ip_split = ip.split(".")
    mascara_split = mascara.split(".")
    endereco_rede = []
    for i in range(4):
        endereco_rede.append(str(int(ip_split[i]) & int(mascara_split[i])))
    return ".".join(endereco_rede)

def calcular_quantidade_hosts(mascara):
    mascara_split = mascara.split(".")
    bits_host = 32 - sum([bin(int(x)).count("1") for x in mascara_split])
    return 2 ** bits_host - 2

def main():
    ip = input("Digite o endereço IP: ")
    mascara = input("Digite a máscara de sub-rede: ")

    broadcast = calcular_broadcast(ip, mascara)
    wildcard = calcular_wildcard(mascara)
    primeiro_ip = calcular_primeiro_ip(ip, mascara)
    ultimo_ip = calcular_ultimo_ip(ip, mascara)
    endereco_rede = calcular_endereco_rede(ip, mascara)
    quantidade_hosts = calcular_quantidade_hosts(mascara)

    print("Endereço IP:", ip)
    print("Máscara de sub-rede:", mascara)
    print("Broadcast:", broadcast)
    print("Wildcard:", wildcard)
    print("Primeiro IP:", primeiro_ip)
    print("Último IP:", ultimo_ip)
    print("Endereço IP de Identificação de Rede:", endereco_rede)
    print("Quantidade de hosts:", quantidade_hosts)

if __name__ == "__main__":
    main()
