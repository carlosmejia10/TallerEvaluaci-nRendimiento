#!/usr/bin/perl
#**************************************************************
#         		Pontificia Universidad Javeriana
#     Autor: J. Corredor
#     Fecha: Febrero 2024
#     Materia: Sistemas Operativos
#     Tema: Taller de Evaluación de Rendimiento
#     Fichero: script automatización ejecución por lotes 
#****************************************************************/

$Path = `pwd`;
chomp($Path);

@Nombre_Ejecutable = ("MM_ejecutable","MM_transpuesta");
@Size_Matriz = ("200","300","400","500","600","1000","2000","3000","4000");
@Num_Hilos = (1,2,3,4,5,6,7,8,9,10,11);
$Repeticiones = 30;

foreach $nombre (@Nombre_Ejecutable){
	foreach $size (@Size_Matriz){
		foreach $hilo (@Num_Hilos) {
			$file = "$Path/$nombre-".$size."-Hilos-".$hilo.".dat";
			for ($i=0; $i<$Repeticiones; $i++) {
				system("$Path/$nombre $size $hilo  >> $file");
				# printf("$Path/$Nombre_Ejecutable $size $hilo \n");
			}
			close($file);
		}
	}
}
