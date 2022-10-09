#include <stdio.h>

int	main(void)
{
	char mojiretu[3][64];
	int i = 0;

	/* キーボードから文字列を入力させる */
	printf("単語を入力してね\n");
	
    while (i < 3)
	{
		printf("? ");
		scanf("%s", mojiretu[i]);
		i++;
	}

	/* 入力した文字列を全て表示 */
	printf("\n入力した文字列\n");
	for (i = 0; i < 3; i++)
	{
		printf("%d) %s\n", i + 1, mojiretu[i]);
	}

	return (0);
}