# IP TABLE
IPv4 패킷을 필터링하고 NAT 를 설정하는데 사용되는 리눅스 커널의 서브시스템이다.
ufw 와 같은 방화벽 프로그램이 있지만, `iptables` 을 직접 사용하는 것이 더 좋다. 더 어렵고 더 복잡하지만, 더 많은 것을 할 수 있기 때문이다.
아래는 하나의 예시이다.
```sh
iptables -t nat -A POSTROUTING -s 192.168.15.0/24 -j MASQUERADE
```
뭔 개소리일까..? 이건 무슨 명령어일까..? 라고 생각할 수 있다.
먼저 용어들을 알아보자.
## TODO
* https://yurmu.tistory.com/31
* https://m.blog.naver.com/rpg2003a/221179917206
* 예제만 https://itwiki.kr/w/%EB%A6%AC%EB%88%85%EC%8A%A4_iptables
## 용어
### Table
커널에서 사전 정의된 종류별 테이블을 활용하여 패킷을 관리한다.  
테이블 자체는 추가, 삭제, 변경할 수 없다.

#### Filter 
이것이 기본 테이블입니다(-t 옵션이 전달되지 않은 경우).  
여기에는 내장 체인 INPUT(로컬 소켓으로 향하는 패킷용),   
FORWARD(박스를 통해 라우팅되는 패킷용) 및 OUTPUT(로컬 생성 패킷용)이 포함되어 있습니다.

#### NAT
이 테이블은 새로운 연결을 생성하는 패킷이 발견될 때 참조됩니다.
이는 PREROUTING(패킷이 들어오자마자 변경), OUTPUT(라우팅 전에 로컬에서 생성된 패킷 변경) 및 POSTROUTING(패킷이 나가려고 할 때 변경)의 세 가지 내장 기능으로 구성됩니다.
* PREROUTING : 패킷을 INPUT rule 로 보내기 전 ip 와 port를 변경하는 역할을 한다.
*  INPUT : filter 테이블과 같은 역할이나, 먼저 적용
*  OUTPUT : filter 테이블과 같은 역할이나, 나중에 적용
*  POSTROUTING : 패킷이 OUTPUT rule 에서 나온 이후 ip 와 port 를 변경하는 역할을 한다.


##### MASQUERADE
* POSTROUTING 체인의 nat 테이블에서만 유효합니다.
* 동적 바인딩 되는 IP 주소가 아닐경우 SNAT를 사용해야 합니다.
* NAT 테이블의 POSTROUTING chain 에서만 사용할 수 있는 target으로, 패킷이 나가는 인터페이스와 IP를 매핑하는 역할을 한다.
* interface 가 down 되면 connection 이 끊긴다.
* DHCP 연결에서만 사용 가능하며, static 의 경우 SNAT 을 사용해야한다.
* tcp, udp, dccp, sctp 에서만 사용 가능하다.
 
* --to-port : 사용할 source port 를 정하여 default SNAT 을 덮어씌운다.
* --random. --random-fully : 포트 매핑을 랜덤하게 한다.

#### Mangle
이 테이블은 패킷의 헤더를 수정하는등 특수 패킷 변경시 사용됩니다.
5가지 기본 체인들을 지원합니다.


* 다음과 같은 작업을 수행하는 데 사용할 수 있습니다. 
  * 패킷의 TTL, TOS, DSCP 값을 변경합니다.
  * 패킷의 MTU를 변경합니다.
  * 패킷의 IP 헤더에 추가 정보를 추가합니다.
* 지원 체인
  * PREROUTING
  * OUTPUT


#### Raw
패킷 필터링을 우회하여 패킷을 허용 또는 차단하는 데 사용됩니다. raw 테이블은 다음과 같은 작업을 수행하는 데 사용할 수 있습니다.
* 특정 IP 주소 또는 프로토콜의 패킷을 허용 또는 차단합니다.
* 패킷의 헤더를 수정하지 않고 패킷을 허용 또는 차단합니다.


### Chain
위 설명과 다르게 `Chain` 은 사용자가 정의할 수 있다.
아래 기본 체인들은 위에 소개한 테이블들에 속한다.
* INPUT
* OUTPUT
* FORWARD
* PREROUTING
* POSTROUTING

### MATCH
* -s: 출발지 매칭. 도메인, IP 주소, 넷마스크 값을 이용하여 표기(––source, ––src)
* -d: 목적지 매칭. 도메인, IP 주소, 넷마스크 값을 이용하여 표기(––destination, ––dst)
* -p: 프로토콜과 매칭. TCP, UDP, ICMP 와 같은 이름을 사용하고 대소문자는 구분하지 않음
* -i: 입력 인터페이스와 매칭(––in-interface)
* -o: 출력 인터페이스와 매칭(––out-interface)
* -j: 매치되는 패킷을 어떻게 처리할지 지정 (--jump)


## 자세히 알아보기
위 용어들을 기반으로 다시 개념을 상기하자.

### Description
Iptables는 Linux 커널에서 IP 패킷 필터 규칙 테이블을 설정, 유지 관리 및 검사하는 데 사용됩니다.   
여러 개의 서로 다른 테이블이 정의될 수 있습니다. 각 테이블에는 여러 내장 체인이 포함되어 있으며 사용자 정의 체인도 포함될 수 있습니다.

### Target
`firewall rule` 즉 방화벽 규칙은 대상을 결정하는 기준, 즉 타겟을 탐색한다.
만약 매치되지 않는다면 다음 규칙에 의해 검토됩니다.
만약 타겟이 매치된다면 `ACCEPT, DROP, QUEUE, or RETURN.` 중 하나를 수행합니다.

* ACCEPT: 패킷을 허용합니다.
* DROP: 패킷을 삭제합니다.
* QUEUE: 패킷을 사용자 공간으로 보냅니다
  * 큐 핸들러는 사용자 정의 프로세스마다 다르지만 아래 큐들이 일반적입니다.
  * `ip_queue`: #TODO
  * `nfnetlink_queue`: #TODO
  * `NFQUEUE`: #TODO
* RETURN: 현재 체인에서 패킷을 반환합니다.
  * 이는 현재 체인에서 패킷을 처리하는 것을 중지하고 Next Rule을 검사합니다.
  * 만일 체인의 끝에 도달하거나 RETURN 대상이 있는 내장 체인의 규칙이 일치하면 체인 정책에 지정된 대상이 패킷의 운명을 결정합니다.
* REJECT: 패킷을 버리고 이와 동시에 적절한 응답 패킷을 전송한다.(icmp-port-unreachable)
* LOG: 패킷을 syslog에 기록한다.
* SNAT --to [주소]: 소스 IP를 [변환(NAT)|NAT]한다.
* DNAT --to [주소]: 목적지 IP를 변환(NAT)한다.


## CLI
이제 `iptables` 사용 양식에 대해 알아볼 차례이다.

| Command                                                    | Description                                                                                                                                                                    |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `iptables -t <table> <command> <chain> <match> <target>`   | This is the general syntax for using the `iptables` command. It specifies the table, command, chain, match criteria, and target for the rule.                                  |
| `iptables -I chain [rulenum] rule-specification [options]` | Inserts a rule in the target chain. If `rulenum` is specified as 1, the rule will be inserted at the beginning of the chain. If no rule number is specified, it defaults to 1. |
| `iptables -R chain rulenum rule-specification [options]`   | Replaces an existing rule in the target chain with a new rule.                                                                                                                 |
| `iptables -D chain rulenum [options]`                      | Deletes a rule from the target chain.                                                                                                                                          |
| `iptables -[LFZ] [chain] [options]`                        | Lists, flushes, or zeroes the packet and byte counters in the specified chain.                                                                                                 |
| `iptables -N chain`                                        | Creates a new user-defined chain with the specified name.                                                                                                                      |
| `iptables -X [chain]`                                      | Deletes a user-defined chain.                                                                                                                                                  |
| `iptables -P chain target [options]`                       | Sets the default policy for the specified chain to the specified target.                                                                                                       |
| `iptables -E old-chain-name new-chain-name`                | Renames a user-defined chain from `old-chain-name` to `new-chain-name`.                                                                                                        |



## 예시
이제 우리는 `iptables` 을 사용할 준비가 되었다.
어떤 예시들이 있을지 알아보자.
### 차단

```sh
iptables -A INPUT 192.168.10.0/24 -j DROP
```
* 192.168.10. 대역으로부터 들어오는 패킷들은 차단하는 정책을 추가


```sh
iptables -P FORWARD DROP
iptables -A FORWARD -i eth1 -j ACCEPT
```
* 패킷은 거부 메시지 없이 무조건 거절한다. (DROP)
* 두 번째 이더넷카드(eth1)로 들어오는 패킷인 경우에만 포워딩을 허가한다.
* 어떠한 방화벽도 설정되어 있지 않고 커널에서 포워딩을 허가한 상태이다.


### 패킷 수정
#### TTL
* `iptables -t mangle -A PREROUTING -i eth0 -p tcp -d 192.168.1.100 -j TTL --ttl-set 10`
  * eth0 인터페이스를 통해 들어오는 경우 적용됩니다.
  * 프로토콜이 TCP이고 목적지 IP 주소가 192.168.1.100인 경우 적용됩니다.
  * TTL 값을 10으로 설정합니다.


## References
* [iptables](https://en.wikipedia.org/wiki/Iptables)
* https://linux.die.net/man/8/iptables
* https://yurmu.tistory.com/31