(function () {
  var exercises = {
    vocabulary: {
      label: 'PALAVRAS',
      questions: [
        {
          prompt: 'O que significa “Hello”?',
          options: ['Adeus', 'Olá', 'Por favor'],
          answer: 1,
          explanation: 'Isso mesmo! “Hello” significa “Olá”.'
        },
        {
          prompt: 'Como se diz “obrigado” em inglês?',
          options: ['Please', 'Goodbye', 'Thank you'],
          answer: 2,
          explanation: 'Muito bem! “Thank you” significa “Obrigado”.'
        },
        {
          prompt: 'Escolhe a palavra que significa “por favor”.',
          options: ['Please', 'Hello', 'Good morning'],
          answer: 0,
          explanation: 'Certo! Usamos “please” para dizer “por favor”.'
        }
      ]
    },
    complete: {
      label: 'COMPLETAR FRASES',
      questions: [
        {
          prompt: 'Completa: “My name ___ Cláudio.”',
          options: ['are', 'is', 'am'],
          answer: 1,
          explanation: 'Boa! “My name is Cláudio” significa “O meu nome é Cláudio”.'
        },
        {
          prompt: 'Completa: “Good ___”, para dizer “Bom dia”.',
          options: ['night', 'morning', 'bye'],
          answer: 1,
          explanation: 'Muito bem! “Good morning” significa “Bom dia”.'
        },
        {
          prompt: 'Completa: “___ you!”',
          options: ['Thank', 'Good', 'Hello'],
          answer: 0,
          explanation: 'Exatamente! “Thank you” significa “Obrigado”.'
        }
      ]
    },
    translate: {
      label: 'TRADUZIR',
      questions: [
        {
          prompt: 'Escreve em inglês: “Olá”.',
          answers: ['hello', 'hi'],
          displayAnswer: 'Hello',
          explanation: 'Muito bem! “Hello” (ou “Hi”) significa “Olá”.'
        },
        {
          prompt: 'Escreve em inglês: “Adeus”.',
          answers: ['goodbye', 'bye', 'good-bye'],
          displayAnswer: 'Goodbye',
          explanation: 'Certo! “Goodbye” significa “Adeus”.'
        },
        {
          prompt: 'Escreve em inglês: “Bom dia”.',
          answers: ['good morning'],
          displayAnswer: 'Good morning',
          explanation: 'Perfeito! “Good morning” significa “Bom dia”.'
        }
      ]
    }
  };

  var exerciseKey = 'vocabulary';
  var questionIndex = 0;
  var score = 0;
  var answered = false;
  var quiz = document.getElementById('quiz');
  var questionText = document.getElementById('question-text');
  var answerList = document.getElementById('answer-list');
  var feedback = document.getElementById('answer-feedback');
  var counter = document.getElementById('quiz-counter');
  var progress = document.querySelector('.progress-track');
  var progressFill = document.getElementById('progress-fill');
  var nextButton = document.getElementById('next-question');
  var encouragement = document.getElementById('quiz-encouragement');
  var choices = document.querySelectorAll('.exercise-choice');

  function getQuestions() {
    return exercises[exerciseKey].questions;
  }

  function renderQuestion() {
    var questions = getQuestions();
    var question = questions[questionIndex];
    var letters = ['A', 'B', 'C'];

    answered = false;
    questionText.hidden = false;
    feedback.hidden = false;
    answerList.hidden = false;
    encouragement.hidden = false;
    nextButton.hidden = false;
    questionText.textContent = question.prompt;
    counter.textContent = 'Pergunta ' + (questionIndex + 1) + ' de ' + questions.length;
    progress.setAttribute('aria-valuenow', String(questionIndex));
    progress.setAttribute('aria-valuemax', String(questions.length));
    progressFill.style.width = (questionIndex / questions.length * 100) + '%';
    feedback.textContent = '';
    feedback.className = 'answer-feedback';
    encouragement.textContent = 'Com calma. Tu consegues!';
    nextButton.disabled = true;
    nextButton.innerHTML = question.answers
      ? 'Verificar resposta <span aria-hidden="true">→</span>'
      : 'Escolhe uma resposta';
    answerList.replaceChildren();

    if (question.answers) {
      var input = document.createElement('input');
      input.className = 'translation-input';
      input.type = 'text';
      input.id = 'translation-answer';
      input.autocomplete = 'off';
      input.autocapitalize = 'none';
      input.spellcheck = false;
      input.setAttribute('aria-label', 'A tua tradução em inglês');
      input.placeholder = 'Escreve a tua resposta em inglês…';
      input.addEventListener('input', function () {
        nextButton.disabled = !input.value.trim() || answered;
      });
      input.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' && !nextButton.disabled) nextButton.click();
      });
      answerList.appendChild(input);
      window.setTimeout(function () { input.focus(); }, 0);
      return;
    }

    question.options.forEach(function (answer, index) {
      var option = document.createElement('button');
      var letter = document.createElement('span');

      option.className = 'answer-option';
      option.type = 'button';
      option.dataset.answerIndex = String(index);
      letter.className = 'answer-letter';
      letter.textContent = letters[index];
      option.appendChild(letter);
      option.appendChild(document.createTextNode(answer));
      answerList.appendChild(option);
    });
  }

  function submitAnswer(correct, explanation, selectedOption) {
    answered = true;
    if (selectedOption) {
      var question = getQuestions()[questionIndex];
      answerList.querySelectorAll('.answer-option').forEach(function (option, index) {
        option.disabled = true;
        if (index === question.answer) option.classList.add('is-correct');
      });
      if (!correct) selectedOption.classList.add('is-wrong');
    } else {
      var input = document.getElementById('translation-answer');
      input.disabled = true;
      input.classList.add(correct ? 'is-correct' : 'is-wrong');
    }

    if (correct) {
      score += 1;
      feedback.textContent = explanation;
      feedback.classList.add('is-correct');
      encouragement.textContent = 'Resposta certa! Muito bem!';
    } else {
      feedback.textContent = 'Quase! ' + explanation;
      feedback.classList.add('is-wrong');
      encouragement.textContent = 'Não faz mal. Já aprendeste mais uma!';
    }

    var questions = getQuestions();
    progress.setAttribute('aria-valuenow', String(questionIndex + 1));
    progressFill.style.width = ((questionIndex + 1) / questions.length * 100) + '%';
    nextButton.disabled = false;
    nextButton.innerHTML = questionIndex === questions.length - 1
      ? 'Ver resultado <span aria-hidden="true">→</span>'
      : 'Próxima pergunta <span aria-hidden="true">→</span>';
  }

  function finishQuiz() {
    var result = document.createElement('div');
    var title = document.createElement('h3');
    var summary = document.createElement('p');
    var restart = document.createElement('button');
    var questions = getQuestions();
    var message = score === questions.length
      ? 'Impecável! Acertaste em todas.'
      : score >= 2
        ? 'Excelente trabalho! Continua a praticar para ficares ainda melhor.'
        : 'Muito bem por teres chegado ao fim! Repete o exercício e vais ver como aprendes depressa.';

    counter.textContent = 'Exercício concluído';
    progress.setAttribute('aria-valuenow', String(questions.length));
    progressFill.style.width = '100%';
    questionText.hidden = true;
    feedback.hidden = true;
    answerList.hidden = true;
    encouragement.hidden = true;
    nextButton.hidden = true;
    result.className = 'quiz-result';
    title.textContent = score === questions.length ? 'Incrível, Cláudio!' : 'Boa, Cláudio!';
    summary.textContent = 'Acertaste em ' + score + ' de ' + questions.length + '. ' + message;
    restart.className = 'next-button';
    restart.type = 'button';
    restart.textContent = 'Repetir exercício';
    restart.addEventListener('click', restartQuiz);
    result.appendChild(title);
    result.appendChild(summary);
    result.appendChild(restart);
    quiz.appendChild(result);
  }

  function restartQuiz() {
    questionIndex = 0;
    score = 0;
    var result = quiz.querySelector('.quiz-result');
    if (result) result.remove();
    renderQuestion();
  }

  answerList.addEventListener('click', function (event) {
    var option = event.target.closest('.answer-option');
    if (!option || answered) return;

    var question = getQuestions()[questionIndex];
    var selected = Number(option.dataset.answerIndex);
    submitAnswer(selected === question.answer, question.explanation, option);
  });

  nextButton.addEventListener('click', function () {
    if (answered) {
      questionIndex += 1;
      if (questionIndex === getQuestions().length) {
        finishQuiz();
        return;
      }
      renderQuestion();
      return;
    }

    var question = getQuestions()[questionIndex];
    if (!question.answers) return;
    var input = document.getElementById('translation-answer');
    var answer = input.value.trim().toLocaleLowerCase().replace(/[.!?]+$/, '');
    var acceptedAnswers = question.answers.map(function (item) {
      return item.toLocaleLowerCase();
    });
    var isCorrect = acceptedAnswers.indexOf(answer) !== -1;
    var explanation = question.explanation;
    if (!isCorrect) explanation += ' A resposta é “' + question.displayAnswer + '”.';
    submitAnswer(isCorrect, explanation);
  });

  choices.forEach(function (choice) {
    choice.addEventListener('click', function () {
      exerciseKey = choice.dataset.exercise;
      questionIndex = 0;
      score = 0;
      var result = quiz.querySelector('.quiz-result');
      if (result) result.remove();
      choices.forEach(function (item) {
        var active = item === choice;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
      document.querySelector('.quiz-label').textContent = exercises[exerciseKey].label;
      renderQuestion();
    });
  });

  document.getElementById('listen-phrase').addEventListener('click', function () {
    var status = document.getElementById('speech-status');
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      status.textContent = 'A leitura em voz alta não está disponível neste navegador.';
      return;
    }

    window.speechSynthesis.cancel();
    var utterance = new SpeechSynthesisUtterance('Hello, my name is Claudio.');
    utterance.lang = 'en-GB';
    utterance.onerror = function () {
      status.textContent = 'Não foi possível reproduzir o áudio. Tenta novamente.';
    };
    status.textContent = 'A ouvir a pronúncia em inglês…';
    utterance.onend = function () {
      status.textContent = '';
    };
    window.speechSynthesis.speak(utterance);
  });

  renderQuestion();
})();
