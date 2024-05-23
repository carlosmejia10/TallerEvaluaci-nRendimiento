/**************************************************************
	Pontificia Universidad Javeriana
	Autor: J. Corredor
	Fecha: Febrero 2024
	Materia: Sistemas Operativos
	Tema: Taller de Evaluación de Rendimiento
	Fichero:.h de multiplicación de matrices NxN por hilos.
	Objetivo: Evaluar el tiempo de ejecución del 
		      algoritmo clásico de multiplicación de matrices.
			  Se implementa con la Biblioteca POSIX Pthreads
****************************************************************/

#ifndef _MULT_MATRICES_H_
#define _MULT_MATRICES_H_

#include <stdio.h>
#include <pthread.h>
#include <unistd.h>
#include <stdlib.h>
#include <time.h>
#include <sys/time.h>

void llenar_matriz(int SZ); 
void print_matrix(int sz, double *matriz);
void inicial_tiempo();
void final_tiempo();
void *mult_thread(void *variables);

#endif