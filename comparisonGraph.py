Python 3.12.2 (tags/v3.12.2:6abddd9, Feb  6 2024, 21:26:36) [MSC v.1937 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license()" for more information.
>>> import matplotlib.pyplot as plt
... 
... # Define specific accuracy values for each model
... mobilenet_v2_accuracy = [
...     88.2, 88.5, 89.0, 88.8, 88.6, 88.9, 88.7, 89.1, 88.4, 88.9,
...     89.2, 88.3, 88.8, 88.5, 89.0, 88.9, 89.1, 88.6, 88.7, 88.9,
...     89.0, 88.4, 88.7, 89.1, 88.6, 88.8, 88.5, 89.0, 88.3, 88.7,
...     88.9, 88.6, 88.5, 89.1, 88.8, 89.0, 88.7, 88.5, 88.9, 88.3,
...     88.8, 88.4, 89.1, 88.5, 88.9, 88.6, 88.7, 89.0, 88.9, 88.4
... ]
... 
... resnet50_accuracy = [
...     91.5, 92.0, 91.8, 91.9, 92.2, 91.7, 92.1, 91.6, 91.9, 92.3,
...     91.8, 92.1, 91.6, 91.7, 91.9, 92.0, 91.8, 92.2, 91.5, 91.9,
...     92.3, 91.6, 92.1, 91.8, 91.7, 92.0, 91.9, 92.1, 91.8, 91.7,
...     92.2, 91.5, 92.3, 91.6, 91.9, 91.8, 91.7, 92.1, 91.9, 92.2,
...     91.8, 92.0, 91.7, 91.9, 92.1, 91.8, 92.0, 91.6, 91.7, 92.3
... ]
... 
... # Generate x-axis values for the 50 data points
... x = range(1, 51)
... 
... # Plotting the accuracies
... plt.figure(figsize=(10, 6))
... plt.plot(x, mobilenet_v2_accuracy, label='MobileNet V2', color='blue', marker='o')
... plt.plot(x, resnet50_accuracy, label='ResNet-50', color='green', marker='x')
... 
... # Adding labels and title
... plt.xlabel('Data Points')
... plt.ylabel('Accuracy (%)')
... plt.title('Comparison Graph')
... plt.legend()
... plt.ylim(85, 95)  # Set y-axis limits for clarity
... 
... # Show plot
... plt.show()
