var nubes=[];
//var numNubes=5;
var grupo;

//var escalas=['ionian','melodicminor','wholetone','diminished','blues','pentatonicmajor',
/*  'pentatonicminor','flamenco','altered','bebopdominant','bebopdominantflatnine',
 'bebopmajor','bebopminor','major','major7','major6','dominant','dominantflat5',"augmented",
 'minor','minor7','minor6','dim','minorflat5','sus4','sus2','fouths','fifth','tritone',
 'hexatonic','chromatic',"octaves"]; */
//var nombresNotas=["C", "Db", "D", "Eb", "E","F", "Gb", "G", "Ab", "A", "Bb", "B" ];

export function creaArr(so){//n=num notas	
	grupo=new window.group();
	for(var i=0;i<so.numNubes;i++){
		nubes[i]=new window.track(); ///lissajousJS
		var d=eval("walk."+yuxtapon(so.aroma)+"("+so.notaBase+","+so.numeroDeOctavas+")");
		nubes[i].beat(so.duracion).notes(d).nl(so.duracion)
			.adsr(so.duracion/4,so.duracion/3,.6,so.duracion/2).vol(so.mainVol*0.25/nubes.length)
			.trans(Math.random()/10);
		grupo.add(nubes[i]);
	};
	console.log("nubes: "+so.numNubes+" dur: "+so.duracion+" aroma: "+so.aroma)
  return [so]
}
 const yuxtapon=function(q){///???
 return q=q.replace(/\s/g, '');
 }
export function destruyeArr(){// vacia nubes
	console.log("diluyo nubes: "+nubes.length)
	for(var i=0;i<nubes.length;i++){
		nubes[i].destroy();
		delete nubes[i];
	};	
	nubes=[];
}

export const initHeal = () => {
  window.initVisual();
  window.context.resume();
	window.clock.tempo=120;
}

