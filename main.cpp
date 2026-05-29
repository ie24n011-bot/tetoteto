#include <iostream>
#include <vector>
#include <conio.h>
#include <windows.h>

using namespace std;

const int WIDTH = 10;
const int HEIGHT = 20;

vector<vector<int>> board(HEIGHT, vector<int>(WIDTH, 0));

int blockX = WIDTH / 2;
int blockY = 0;

void draw() {
    system("cls");

    for (int y = 0; y < HEIGHT; y++) {
        for (int x = 0; x < WIDTH; x++) {

            // 落下中ブロック
            if (x == blockX && y == blockY) {
                cout << "[]";
            }

            // 固定されたブロック
            else if (board[y][x] == 1) {
                cout << "[]";
            }

            // 空白
            else {
                cout << " .";
            }
        }
        cout << endl;
    }

    cout << endl;
    cout << "A:左 D:右 S:下 Q:終了" << endl;
}

int main() {

    int frame = 0;

    while (true) {

        draw();

        // キー入力
        if (_kbhit()) {

            char c = _getch();

            // 左
            if (c == 'a' && blockX > 0) {
                blockX--;
            }

            // 右
            if (c == 'd' && blockX < WIDTH - 1) {
                blockX++;
            }

            // 下
            if (c == 's' && blockY < HEIGHT - 1) {
                blockY++;
            }

            // 終了
            if (c == 'q') {
                break;
            }
        }

        // 自動落下
        frame++;

        if (frame >= 5) {

            // まだ下に行ける
            if (blockY < HEIGHT - 1) {
                blockY++;
            }

            // 一番下に着いた
            else {

                // 固定
                board[blockY][blockX] = 1;

                // 新ブロック生成
                blockX = WIDTH / 2;
                blockY = 0;
            }

            frame = 0;
        }

        Sleep(100);
    }

    return 0;
}