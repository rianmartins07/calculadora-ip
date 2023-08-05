// obter a referência do elemento select
const select = $('#select-mask')

// loop através das máscaras de sub-rede do IPv4 (de 0 a 32 bits)
for (let i = 8; i <= 32; i++) {
  // criar um elemento option para cada máscara de sub-rede
  let option = `<option value="${subnetMask(i)}" id="${i}">${subnetMask(i)}/${i}</option>`;
  // adicionar a opção ao elemento select
  select.append(option);
}

// função que retorna a máscara de sub-rede com base no número de bits
function subnetMask(bits) {
  let mask = '';
  for (let i = 0; i < 4; i++) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      if (bits > 0) {
        byte += Math.pow(2, 7 - j);
        bits--;
      }
    }
    mask += byte + (i < 3 ? '.' : '');
  }
  return mask;
}

function ipv4() { 
    let ip = $('#ip').val().split('.');
    let cid = $("#select-mask :selected").attr('id');
    
    let mask = $("#select-mask").val().split('.');
    
    let wildcard = []
    let broadcast = []
    let network = []
    let hosts = []
    let host_min = []
    let host_max = []
    if (ip.length != 4){
        throw alert("IP inserido incorretamente");
    }
    for (let i=0;i<4;i++){
        wildcard[i] = ~mask[i] & 0xFF
        broadcast[i] = ip[i] | (~mask[i] & 0xFF)
        network[i] = ip[i] & mask[i]
        
        host_min[i] = ip[i] & mask[i]
        host_max[i] = broadcast[i] = ip[i] | (~mask[i] & 0xFF)
        
    }
    hosts = (1<<(32-cid))-2

    if (hosts <0){
        hosts = 'N/A'
    }
    ip = ip.join('.')
    mask = mask.join('.')
    host_min[3]+=1;
    host_max[3]-=1;
    wildcard = wildcard.join('.')
    broadcast = broadcast.join('.')
    network = network.join('.')
    host_min = host_min.join('.')
    host_max = host_max.join('.')
    if (cid == 31) {
      host_max = 'N/A'
      host_min = 'N/A'
      hosts = 'N/A'
    } else if (cid == 32){
      broadcast  = 'N/A'
      host_min = 'N/A'
      host_max = 'N/A'
      hosts = 'N/A'
    }

    buildTable(ip, mask,cid, wildcard, broadcast, network, hosts, host_min, host_max)

}

function buildTable(ip, mask,cid, wildcard, broadcast, network, hosts, host_min, host_max) {
  html = `
      <div class="col-sm-6">
      <h3 style="text-align: right;">Endereço IP:</h3>
    </div>
    <div class="col-sm-6">
      <h3>${ip}</h3>
    </div>
    <div class="col-sm-6">
      <h3 style="text-align: right;">Máscara subrede:</h3>
    </div>
    <div class="col-sm-6">
      <h3>${mask}/${cid}</h3>
    </div>
    <div class="col-sm-6">
      <h3 style="text-align: right;">Rede (network):</h3>
    </div>
    <div class="col-sm-6">
      <h3>${network}</h3>
    </div>
    <div class="col-sm-6">
      <h3 style="text-align: right;">Broadcast IP:</h3>
    </div>
    <div class="col-sm-6">
      <h3>${broadcast}</h3>
    </div>
    <div class="col-sm-6">
      <h3 style="text-align: right;">Primeiro IP (hosts):</h3>
    </div>
    <div class="col-sm-6">
      <h3>${host_min}</h3>
    </div>
    <div class="col-sm-6">
      <h3 style="text-align: right;">Último IP (hosts):</h3>
    </div>
    <div class="col-sm-6">
      <h3>${host_max}</h3>
    </div>
    <div class="col-sm-6">
      <h3 style="text-align: right;">Wildcard:</h3>
    </div>
    <div class="col-sm-6">
      <h3>${wildcard}</h3>
    </div>
    <div class="col-sm-6">
      <h3 style="text-align: right;">Hosts disponíveis:</h3>
    </div>
    <div class="col-sm-6">
      <h3>${hosts}</h3>
    </div>
  `

  $(".result").html(html);
}