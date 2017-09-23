#include <stdio.h>
#include <stdlib.h>
#include <cstdlib>
#include <map>
#include <string>
#include <vector>

char* toString(int val);

int main(int argc, char* argv[])
{
	int numSongs = std::atoi(argv[1]);
	float tempos[numSongs];

	printf("%s\n", std::getenv("TEMPO"+toString(0)));

	/*for(int x=0; x<numSongs; x++){
		tempos[x] = std::atof(std::getenv("TEMPO"+x));
		printf("%lf\n", tempos[x]);
	}*/

	//printf("hey %s\n", song_data[0].artistOutput);
  	//printf("Hello %s\n", argv[1]);
}

char* toString(int val){
	char str[100];
	sprintf(str, "%d", val);
	return str;
}