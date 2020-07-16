import numpy as np
import cv2

from time import time

img1 = cv2.imread("./test_image/rgb.jpg", -1)
img2 = cv2.imread("./test_image/rgba.png", -1) # this one has transparency
h, w, c = img2.shape

img1 = cv2.resize(img1, (w, h), interpolation = cv2.INTER_CUBIC)
result = np.zeros((h, w, 3), np.uint8)

while True:
    ret, frame = cap.read()
    frame = cv2.resize(frame, None, fx=2, fy=2, interpolation=cv2.INTER_AREA)

    img = cv2.imread("test.png")

    bg = overlay_transparent(frame,img,0,0)

    cv2.imshow('Input', bg)

#fast
st = time()
alpha = img2[:, :, 3] / 255.0
result[:, :, 0] = (1. - alpha) * img1[:, :, 0] + alpha * img2[:, :, 0]
result[:, :, 1] = (1. - alpha) * img1[:, :, 1] + alpha * img2[:, :, 1]
result[:, :, 2] = (1. - alpha) * img1[:, :, 2] + alpha * img2[:, :, 2]
end = time() - st
print(end)

cv2.imshow("result", result)
cv2.waitKey(0)
cv2.destroyAllWindows()