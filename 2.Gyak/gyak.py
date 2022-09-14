import math

def minimax(depth, index, isMax, scores, maxDepth):
    if depth == maxDepth:
        return scores[index]
    if isMax:
        return max(
            minimax(depth+1,index*2,not isMax,scores,maxDepth),
            minimax(depth+1,index*2+1,not isMax,scores,maxDepth)
        )
    else:
        return min(
            minimax(depth+1,index*2,not isMax,scores,maxDepth),
            minimax(depth+1,index*2+1,not isMax,scores,maxDepth)
        )

def main():
    b = 2
    scores = [3,6,12,10,5,25,7,112]
    d = math.log(len(scores),b)    
    print(minimax(0,0,True,scores,d))

if __name__ == "__main__":
    main()