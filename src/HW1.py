from transformers import pipeline
from transformers import AutoTokenizer, AutoModelForSequenceClassification

classifier = pipeline("sentiment-analysis")
res = classifier("I`ve been waiting for a hugging face course my whole life but im nervous.")
print(res)

generator = pipeline("text-generation", model="gpt2")
res = generator(
   "In this course I will learn how to",
   max_length=30,
   num_workers=2
    
)
print(res)

classifier = pipeline("zero-shot-classification")

res=classifier(
    "This is a course about Python list comprehension",
    candidate_labels=["education","politics","business"]
)

print(res)

classifier = pipeline("sentiment-analysis")
res=classifier("Ive been waiting for a long time for a HuggingFace course my whole life")

print(res)
model_name="distilbert-base-uncased-finetuned-sst-2-english"
model = AutoModelForSequenceClassification.from_pretrained(model_name)
tokenizer = AutoTokenizer.from_pretrained(model_name)

classifier = pipeline("sentiment-analysis", model=model, tokenizer=tokenizer)
res=classifier("Ive been waiting for a long time for a HuggingFace course my whole life")
print(res)

sequence= "using a Trnasformer network is simple"
res =tokenizer(sequence)
print(res)
tokens=tokenizer.tokenize(sequence)
print(tokens)
ids =tokenizer.convert_tokens_to_ids(tokens)
print(ids)
decoded_string = tokenizer.decode(ids)
print(decoded_string)