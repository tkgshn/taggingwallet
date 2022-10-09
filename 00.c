#include <stdio.h>

int main(int argc, char *argv[]) {

    for (int i = 0; i < argc; i++) {

        /* 第i個目のコマンドライン引数を表示 */
        printf("%s\n", argv[i]);
    }

    return 0;
}
