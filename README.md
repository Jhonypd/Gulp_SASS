# Gulp_I
Aulas sobre Gulp, primeira etapa.

# Gulp

Kit de ferramentas de automação de tarefas baseada em JavaScript

- Otimizar o fluxo de trabalho (desenvolvimento)
- Organização e orquestração de arquivos
- Ajuda a evitar trabalhos lentos e repetitivo
- Criação de pipelines
- Você cria as configurações necessárias (flexível)
- Tarefas escritas em JS ou plug-ins
- Aplica transformações em arquivos ainda na memória (antes de gravar no disco)

## Porquê automatizar?
- Melhor organização
- Evitar repetição de tarefas
- Mais tempo para focar no mais importante: regras de negócio e experiência do usuário

## Principais recursos
- Minificação de arquivos
- Otimização de imagens (para melhor performance)
- Mescla de arquivos de diferentes origens

## Transpilação para JS
- É o processo de transformação (conversão) de escrita em outras linguagens para o JavaScript. Você poderá escrever em TypeScript ou Babel que o código.

Todo o processo é executado a partir node.js e gulp-cli (linha de comando)

## Global x Local
- A instalação do Node.js é global
- Já o Gulp e seus plugins são instalados localmente (em cada projeto)

## Gerenciadores de pacotes
- Dependências do projeto
- NPM: Node Package Manager
- Utiliza o Node.js
- Permite a configuração rápida e fácil de ambientes e plugins Node


## Instalando o Gulp
- Rodar o Node.js
- Agora na pasta do projeto, adicionar o npm: npm init -y
- Instalar o gulp-cli (Command Line Interface) globalmente: npm install gulp-cli -g
- Criar o gulpfile.js

## Trabalhando com Gulp
- Baseado em funções: tasks
- Organização do projeto
- Otimização de arquivos
- Mesclagem e Minificação de CSS e JS
- Diminuição do tamanho (bytes) de imagens



## Fazendo as tarefas no gulpfile.js
- Para minificar o CSS precisando isntalar usando o comando ```(npm install gulp-concat --save-dev)``` - que faz a concatenação dos arquivos.
- tamém é necessario a dependencia cssmin, rename, onde cssmin será responsavel por minificar e a rename por renomear a o arquivo novo gerado, para instalar essas demais dependencias, basta trocar o ```gulp-concat``` por gul-"nome da dependencia, ou consultar o NPM(site)".

```
    function tarefasCSS(cb) {

    return gulp.src('./vendor/**/*.css') //busca os arquivos na pasta
        .pipe(concat('libs.css')) //concatena os arquivos com o nome libs
        .pipe(cssmin()) //minifica os arquivos css
        .pipe(rename({ suffix: '.min'}))  //renomeia os arquivos colocando o .min ao final, libs.min.css é como ficará o novo "name"
        .pipe(gulp.dest('./dist/css')) // faz a criação do arquivo e coloca dentro de um pasta, pode ser uma nova ou existente.
} 

exports.styles = tarefasCSS

```

- Ainda sobre minificar o CSS, veja que na funcção acima estamos primeiro localizando dentro de uma determinada pasta os arquivos que tenham o ```.css``` para isso usamos o comando ```src``` do gulp, e depois declaramos em qual caminho ele deve buscar, no gulp podemos usar dois ``` * * ``` para definir que sej a buscado em qualquer pasta dentro da pasta especificada por nome, e um ``` * ``` para informar que queremos qualquer arquivo que tenha a extenssão de arquivo ```.css```.

no terminal podemos usar o comando "gulp style" para que a tarefa seja executada, assim gerando um 

-Para a minificação de Js é a mesma sintaxe, porem precisa dar um ```npm install gulp-uglify --save-dev``` para instalar essa dependencia que será repsonsavel pelo processo de minificar.


```
function tarefasJS(){
    return gulp.src('./vendor/**/*.js')
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'}))
        .pipe(gulp.dest('./dist/js'))
 }
 exports.scripts = tarefasJS
```


- Veja que basta subtituir o -gulp-cssmin pelo gulp-uglify e as extenções de arquivos .css por .js, e para organizar gerar uma nova pasta reponsavel por guardar os novos arquivos js.mim.

 - Para funcionar corretamente as compreções de imagens, tive que usar a dependencia v8.0.0 utilize a a versão anterior a ela v7.1.0.

 ```
  npm intall gulp-imagemin --save-dev   linha de comando para instalar
```

## Rodar o projeto
- Executar o comando:

```
npm install
```
# Gulp_SASS
