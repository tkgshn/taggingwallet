#include <stdio.h>
#include <string.h>

int	main(void)
{
	char *address[] = {
		"0xF60fB76e6AD89364Af3ffE72C447882bFe390331",
		"0x285b7EEa81a5B66B62e7276a24c1e0F83F7409c1",
		"0x65150B5Fa861481651225Ef4412136DCBf696232",
		"0x5A384227B65FA093DEC03Ec34e111Db80A040615",
		"0x199012076Ea09f92D8C30C494E94738CFF449f57"};

	int i = 0;
	char answer[5][64];

	printf("このウォレットアドレスのトランザクションを見て、次のうちどのカテゴリーに該しそうかを主観で回答してください\n");
	printf("次のうち、表示されたウォレットアドレスはどれに該当しそうですか？\n数字で回答してください\na: NFT\nb: DeFi\nc: Game\nd: Public Goods\n");

	//ここからaddressの中に入っているのを表示し、入力を求める。回答はscanfで文字列を取得している。
	while (i < 5)
	{
		printf("https://etherscan.io/address/%s\n", address[i]);
		printf("? ");
		scanf("%s", answer[i]);
		i++;
	}

	printf("\n入力したデータを確認します\n");
	i = 0; //一旦初期化しないとこの後のデータが表示されない
	while (i < 5)
	{
		printf("%s: ", address[i]);

		// これで回答したものがa, b, c, dのどれかに該当する場合、それに対応するカテゴリーを返す
		//strcmpを使って2つの変数が同様（同じ場合は`0`を返す）であれば、文字を出力
		if (strcmp(answer[i], "a") == 0)
		{
			printf("NFT\n");
		}
		else if (strcmp(answer[i], "b") == 0)
		{
			printf("DeFi\n");
		}
		else if (strcmp(answer[i], "c") == 0)
		{
			printf("Game\n");
		}
		else if (strcmp(answer[i], "d") == 0)
		{
			printf("Public Goods\n");
		}
		else
		{
			printf("入力した回答が間違っている場合があります\n");
		}
		i++;
	}
	return (0);
}