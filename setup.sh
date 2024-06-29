npm install --prefix frontend
sleep 1
mvn install --file ping
sleep 1
curl -fsSL https://ollama.com/install.sh | sh
sleep 1
ollama pull tinyllama
